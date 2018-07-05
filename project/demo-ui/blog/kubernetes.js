module.exports = `![Banner](/static/images/banner.png)
# [Kubernetes](https://kubernetes.io)

The goal of this section is to show how to deploy your services to Kubernetes. Kubernetes is a container orchestration system that automates deployment, scaling, management, etc of containerized applications.

The concepts we will be dealing with are:
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/) are the smallest deployable units that can be created and managed. Each pod is a group of one or more containers.
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) allow you to declaritively define the relationship between ReplicaSets and Pods.
- [Services](https://kubernetes.io/docs/concepts/services-networking/service/) are an abstraction which defines a logical set of Pods and a policy by which to access them.

> This is only a small subset of the features Kubernetes provides but sufficient for our demonstration.
 
## Product Review Service

The scenario we're using for this demostration comprises of 3 microservices and 2 datasources. 

![Topology](static/images/api-builder-topology.svg)

> For this demostration we will also be hosting the databases in the Kubernetes cluster but in a real world situation these likely be hosted elsewhere (or at the very least have persistent storage and be scalable).

For the demo our pods will just contain a single microservice. If we were deploying a sidecar such as Istio [https://istio.io/](https://istio.io/) then we'd also have Envoy in the pods. The **product-review-service** is the only microservice that will be accessible outside of the cluster. So from a Kubernetes entity perspective, a more accurate visualization of this is:

![K8s Topology](static/images/api-builder-topology-k8s.svg)


### Ingress

An Ingress manages external access to services in the cluster. Typically they provide load balancing, SSL termination, routing and policy. Kubernetes *does not* require that services be access via an Ingress however GKE does. Even if the service in a GKE cluster has type *NodePort* it is still not externally accessible in GCE/GKE. 

\`\`\`yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: {{ .Release.Name }}-product-review
  namespace: {{ .Values.namespace }}
spec:
  backend:
    serviceName: {{ .Release.Name }}-product-review
    servicePort: 8080
\`\`\`

For GKE this configures a Google Cloud Load Balancer ([https://cloud.google.com/load-balancing/](https://cloud.google.com/load-balancing/)).

![GKE Ingress](static/images/ingress.png)

#### SSL

The Ingress controller can also be configured to use a key/cert from a Kubernetes tls secret. For detail, see [https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-multi-ssl](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-multi-ssl).

For the example we have a sample key and certificate for _foo.bar.com_. This is defined in [product-review-secret.yaml](../project/helm-product-review-chart/templates/product-review-secret.yaml), though in production you'd more like manage the creation of this secret more securely.

The ingress definition [product-review-ingress.yaml](../project/helm-product-review-chart/templates/product-review-ingress.yaml) uses this secret:

\`\`\`yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: {{ .Release.Name }}-product-review
  namespace: {{ .Values.namespace }}
  labels:
    app: product-review
    chart: {{ .Chart.Name }}-{{ .Chart.Version }}
    release: {{ .Release.Name }}
    heritage: {{ .Release.Service }}
  annotations:
    kubernetes.io/ingress.allow-http: "false"
spec:
  tls:
  - secretName: {{ .Release.Name }}-secret
  backend:
    serviceName: {{ .Release.Name }}-product-review
    servicePort: 8080
\`\`\`

## Helm ([https://helm.sh](https://helm.sh))

To simplify/automate the deployment we'll use Helm. Helm is "the package manager for Kubernetes". A Helm _chart_ allows you to define, install and upgrade complex Kubernetes applications. 

To deploy/configure something in Kubernetes you create a YAML file describing the resource being deployed. For example:

\`\`\`yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
\`\`\`

This YAML file describes a ServiceAccount, this is deployed using **kubectl**

\`\`\`bash
$ kubectl create -f resource.yaml
\`\`\`

However as your deployment gets larger and more complex this becomes quite hard to manage and automate. This is the problem Helm solves. It allows you to create logical groupings of your resource yaml files. These are known as _Charts_. Then to deploy your application it delivers the _chart_ and the values for the templates to a service running in your cluster called _Tiller_. Tiller then applies all the changes.

The templates in a chart can be parameterized, this means charts can be distributed and easily customized - only the _values.yaml_ file needs to be edited. For our demonstration, each of our microservices (and, for this demo, datastores too) will be deployed as pods with replicas using a _Deployement_ and also a _Service_ per deployment so that they can communicate.

## Google Kubernetes Engine (GKE)

There are an multipe cloud plaforms that provide support for Kubernetes orchestration, such as Amazon EKS, Azure Kubernetes Serivce and Google Kubernetes Engine. In this section we will look at how to deploy your application to the Google Kubernetes Engine (GKE). While some of the steps outlined here are GKE specific, in general the same topics will apply to all vendors.

### Setting up Google Kubernetes Engine (GKE)

> This is a brief overview of the steps to configure you machine to access GKE, however this is not an in-depth how-to guide. So for more information please consult the documentation [https://cloud.google.com/kubernetes-engine](https://cloud.google.com/kubernetes-engine).

GKE runs on the Google Cloud Platform (GCP), so the first step is to install the Google Cloud SDK (**gcloud**). This will be platform dependent, see [https://cloud.google.com/sdk/install](https://cloud.google.com/sdk/install).

#### Create a project

GCP resources are organized hierarchically. Starting from the bottom of the hierarchy, projects are the first level, and they contain other resources. All resources must belong to exactly one project. See [https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) for more detail.

GCP/GKE has a rich UI and a lot of the tasks descibed here can also be achieved via the UI. To create a project you can go to [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate). 

It can also be done from the command line using Google Cloud SDK (gcloud) we can also do it from the command line.

\`\`\`bash
gcloud projects create rd-api-builder
\`\`\`

You can view your projects:

\`\`\`bash
$ gcloud projects list
PROJECT_ID      NAME            PROJECT_NUMBER
rd-api-builder  RD-API-BUILDER  599994285848
\`\`\`

To make working with the gcloud cli simpler you can set defaults for your project and compute zones, rather than having to specify them on each command.

\`\`\`bash
$ gcloud config set project rd-api-builder
Updated property [core/project].

$ gcloud config set compute/zone europe-west2-a
Updated property [compute/zone].
\`\`\`

We're using the _europe-west2-a_ zone (London), a full list of the available zones/regions can be found [https://cloud.google.com/compute/docs/regions-zones/](https://cloud.google.com/compute/docs/regions-zones/).


#### Creating a cluster

A Kubernetes cluster is a managed group of uniform VM instances for running Kubernetes. These are the VMs that our application will be running on. Creating your cluster in the UI is the simplest option, [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list).

![Create Cluster](static/images/create_cluster_02.png)

However you can also create it from command line:

\`\`\`bash
gcloud beta container clusters create "product-review-cluster" 
    --username "admin"
    --cluster-version "1.9.7-gke.3"
    --machine-type "n1-standard-1"
    --image-type "COS"
    --disk-type "pd-standard"
    --disk-size "100"
    --scopes "https://www.googleapis.com/auth/compute","https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append"
    --num-nodes "5"
    --enable-cloud-logging
    --enable-cloud-monitoring
    --network "default"
    --subnetwork "default"
    --addons HorizontalPodAutoscaling,HttpLoadBalancing,KubernetesDashboard
    --no-enable-autoupgrade
    --enable-autorepair
\`\`\`

You can list the available clusters:

\`\`\`bash
$ gcloud beta container clusters list
NAME                    LOCATION        MASTER_VERSION  MASTER_IP      MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
product-review-cluster  europe-west2-a  1.9.7-gke.3     35.189.68.218  n1-standard-1  1.9.7-gke.3   5          RUNNING
\`\`\`

Or view them in the UI:
![Cluster list](static/images/create_cluster_03.png)

### Configure kubectl

Once you have a project and a cluster created you need to configure _kubectl_ to use it. 

\`\`\`bash
gcloud container clusters get-credentials product-review-cluster
\`\`\`

You can verify it confugyred by ensuring you can see the Kubernetes services.

\`\`\`bash
$ kubectl get svc --namespace kube-system
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
default-http-backend   NodePort    10.31.253.33    <none>        80:30164/TCP    2h
heapster               ClusterIP   10.31.251.150   <none>        80/TCP          2h
kube-dns               ClusterIP   10.31.240.10    <none>        53/UDP,53/TCP   2h
kubernetes-dashboard   ClusterIP   10.31.250.203   <none>        443/TCP         2h
\`\`\`

### Configuring Helm ([https://helm.sh/](https://helm.sh/))

To install Helm on your platform see the installation instructions [https://github.com/kubernetes/helm#install](https://github.com/kubernetes/helm#install).

As mentioned earlier, Helm requires a service called _Tiller_ to be installed into your cluster to deploy _Charts_. On GKE this requires a service account with necessary role, for detail see [https://docs.helm.sh/using_helm/#gke](https://docs.helm.sh/using_helm/#gke).


\`\`\`bash
$ kubectl create -f project/helm-setup/rbac-config.yaml
\`\`\`

The you can install the Tiller service by doing:

\`\`\`bash
$ helm init --service-account tiller
$HELM_HOME has been configured at /home/gavin/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.
Happy Helming!
\`\`\`

If you now list the services in your cluster you will see a _tiller-deploy_.

\`\`\`bash
$ kubectl get svc --namespace kube-system
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
default-http-backend   NodePort    10.31.253.33    <none>        80:30164/TCP    2h
heapster               ClusterIP   10.31.251.150   <none>        80/TCP          2h
kube-dns               ClusterIP   10.31.240.10    <none>        53/UDP,53/TCP   2h
kubernetes-dashboard   ClusterIP   10.31.250.203   <none>        443/TCP         2h
tiller-deploy          ClusterIP   10.31.253.1     <none>        44134/TCP       2h
\`\`\`


## Building the images

Your DevOps process would be responsible for building and publishing the Docker images, but in this case we'll build the images locally.

\`\`\`bash
docker build -t axway/api-builder-v4-demo-mysql project/mysql
docker build -t axway/api-builder-v4-demo-mongo project/mongo
docker build -t axway/api-builder-v4-demo-review project/review-service
docker build -t axway/api-builder-v4-demo-product project/product-service
docker build -t axway/api-builder-v4-demo-product-review project/product-review-service
\`\`\`

For GKE we are going to push the images to the Google Container Registy (GCR). See [https://cloud.google.com/container-registry/docs/pushing-and-pulling](https://cloud.google.com/container-registry/docs/pushing-and-pulling).

\`\`\`bash
docker tag axway/api-builder-v4-demo-mysql gcr.io/rd-api-builder/axway/api-builder-v4-demo-mysql
docker tag axway/api-builder-v4-demo-mongo gcr.io/rd-api-builder/axway/api-builder-v4-demo-mongo
docker tag axway/api-builder-v4-demo-review gcr.io/rd-api-builder/axway/api-builder-v4-demo-review
docker tag axway/api-builder-v4-demo-product gcr.io/rd-api-builder/axway/api-builder-v4-demo-product
docker tag axway/api-builder-v4-demo-product-review gcr.io/rd-api-builder/axway/api-builder-v4-demo-product-review
docker push gcr.io/rd-api-builder/axway/api-builder-v4-demo-mysql
docker push gcr.io/rd-api-builder/axway/api-builder-v4-demo-mongo
docker push gcr.io/rd-api-builder/axway/api-builder-v4-demo-review
docker push gcr.io/rd-api-builder/axway/api-builder-v4-demo-product
docker push gcr.io/rd-api-builder/axway/api-builder-v4-demo-product-review
\`\`\`

## Demo

\`\`\`bash
helm install --name demo project/helm-product-review-chart
\`\`\`

> Note, the deployment of the ingress can take up to 10 minutes. 

Once everything is deployed and started you can get the external IP address of the Ingress:

\`\`\`bash
$ kubectl get ing --namespace api-builder
NAME                  HOSTS     ADDRESS       PORTS     AGE
demo-product-review   *         35.241.12.7   80, 443   31m
\`\`\`

> Note even though the ingress reports it's available on port 80 we've actually disabled that using the **kubernetes.io/ingress.allow-http** annotation in the [product-review-ingress.yaml](../project/helm-product-review-chart/templates/product-review-ingress.yaml).

### Review
Looking athe GKE  UI we can see what helm has done.

1. Services
The Services tab lists the services and ingresses created. For each pod in our demo we have a service. All the services _except_ demo-product-review are "Cluster IP", they are only accessible from within the cluster. demo-product-review is of type "Node Port" - it will be externally visible.
![Services](static/images/gke_services.png)
1. Deployments
The deployments section shows the five deployments, two for the databases and then one deployment per microservice. Note that each of the services is run two pods, replicas for load handling.
![Deployments](static/images/gke_deployments.png)
1. Pods and replicas
If we drill into one of the deployments we can see more detail on the pods and replicas in the deployment.
![Pods and Replicas](static/images/gke_podsAndReplicas.png)
1. Secrets
To add TLS to the Ingress we had to create a secret containing the key/cert details. This is the _demo-secret_ on the configuration page.
![Secrets](static/images/gke_secrets.png)

To get the swagger definition of the service https://_ipaddress_/apidoc/swagger.json, so in this case [https://35.241.5.136/apidoc/swagger.json](https://35.241.5.136/apidoc/swagger.json).


### Testing

\`\`\`bash
$ curl -s --insecure -u my-product-review-secret-apikey: https://35.241.5.136/api/v1/productinfo/SKU1 | jq
{
  "sku": "SKU1",
  "name": "Spicy World Peppercorn",
  "description": "If we had to select just one spice to flavor our food, pepper, the master spice ,would be a wise choice.",
  "reviews": {
    "id": "5b3b39547beff0d358ea9964",
    "sku": "SKU1",
    "reviews": [
      {
        "review": "Best taste ever!!!",
        "user": "John"
      },
      {
        "review": "Had better meals!!!",
        "user": "Jack"
      },
      {
        "review": "Too spicy!!!",
        "user": "Jane"
      }
    ]
  },
  "taxonomy": [
    {
      "confidence_score": 0.98999,
      "tag": "food and drink/food"
    },
    {
      "confidence_score": 0.973018,
      "tag": "shopping/gifts"
    },
    {
      "confidence_score": 0.972578,
      "tag": "style and fashion/accessories"
    }
  ]
}
\`\`\`
`
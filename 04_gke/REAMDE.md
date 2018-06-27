# Deploying to Google Kubernetes Engine

There are an multipe cloud plaforms that provide support for Kubernetes orchestration, such as Amazon EKS, Azure Kubernetes Serivce and Google Kubernetes Engine. In this section we will look at how to deploy your application to the Google Kubernettes Engine (GKE). While some of the steps outlined here are GKE specific, in general the same topics will apply to all vendors.


## Setting up Google Kubernetes Engine (GKE)

This is just an overview of the steps to configure you machine to access GKE, however this is not a complete how-to guide. So for more information please consult the documentation [https://cloud.google.com/kubernetes-engine](https://cloud.google.com/kubernetes-engine).

GKE runs on the Google Cloud Platform (GCP), so the first step is to install the Google Cloud SDK (`gcloud`). This will be platform dependent, see [https://cloud.google.com/sdk/install](https://cloud.google.com/sdk/install).

### Create a project

GCP resources are organized hierarchically. Starting from the bottom of the hierarchy, projects are the first level, and they contain other resources. All resources must belong to exactly one project. See [https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) for more detail.

GCP/GKE has a rich UI and a lot of the tasks descibed here can also be achieved via the UI. To create a project you can go to [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate). 

However as we installed the Google Cloud SDK (gcloud) we can also do it from the command line.

```bash
$ gcloud projects create api-builder-v4-te
Create in progress for [https://cloudresourcemanager.googleapis.com/v1/projects/api-builder-v4-te].
Waiting for [operations/cp.5974774110346936774] to finish...done.      
```

You can view your projects:

```bash
$ gcloud projects list
PROJECT_ID         NAME               PROJECT_NUMBER
api-builder-v4-te  api-builder-v4-te  808803406091
```

To make working with the gcloud cli simpler you can set defaults for your project and compute zones, rather than having to specify them on each command.

```bash
$ gcloud config set project api-builder-v4-te
Updated property [core/project].

$ gcloud config set compute/zone europe-west2-a
Updated property [compute/zone].
```

We're using the _europe-west2-a_ zone (London), a full list of the available zones/regions can be found [https://cloud.google.com/compute/docs/regions-zones/](https://cloud.google.com/compute/docs/regions-zones/).


### Creating a cluster

A Kubernetes cluster is a managed group of uniform VM instances for running Kubernetes. These are the VMs that our application will be running on. Creating your cluster in the UI is the simplest option, (https://console.cloud.google.com/kubernetes/list?project=api-builder-v4-te](https://console.cloud.google.com/kubernetes/list?project=api-builder-v4-te).

![Create Cluster](./images/create_cluster_02.png)

However you can also create it from command line:

```bash
gcloud beta container clusters create product-review-cluster \
    --num-nodes "5" \
    --username "admin" \
    --cluster-version "1.8.10-gke.0" \
    --machine-type "n1-standard-1" \
    --image-type "COS" \
    --disk-type "pd-standard" \
    --disk-size "100" \
    --scopes "https://www.googleapis.com/auth/compute","https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" \
    --enable-cloud-logging \
    --enable-cloud-monitoring \
    --network "default" \
    --subnetwork "default" \
    --addons HorizontalPodAutoscaling,HttpLoadBalancing,KubernetesDashboard \
    --no-enable-autoupgrade \
    --enable-autorepair
```

You can list the available clusters:

```bash
$ gcloud beta container clusters list
NAME                    LOCATION        MASTER_VERSION  MASTER_IP     MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
product-review-cluster  europe-west2-a  1.8.10-gke.0    35.230.133.8  n1-standard-1  1.8.10-gke.0  5          RUNNING
```

Or view them in the UI:
![Cluster list](./images/create_cluster_03.png)

### Configure kubectl

Once you have a project and a cluster created you need to configure _kubectl_ to use it. 

```bash
gcloud container clusters get-credentials product-review-cluster
```

You can verify it confugyred by ensuring you can see the Kubernetes services.

```bash
$ kubectl get svc --namespace kube-system
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
default-http-backend   NodePort    10.31.253.33    <none>        80:30164/TCP    2h
heapster               ClusterIP   10.31.251.150   <none>        80/TCP          2h
kube-dns               ClusterIP   10.31.240.10    <none>        53/UDP,53/TCP   2h
kubernetes-dashboard   ClusterIP   10.31.250.203   <none>        443/TCP         2h
```

## Configuring Helm (https://helm.sh/)[https://helm.sh/]

Helm is "the package manager for Kubernetes". A Helm _chart_ allows you to define, install and upgrade complex Kubernetes applications. We'll investigate Helm later but we need to install Helm.

To install Helm on your platform see the installation instructions (https://github.com/kubernetes/helm#install)[https://github.com/kubernetes/helm#install].

Helm will install a service called _Tiller_ in you cluster. On GKE this requires a service account with necessary role, for detail see (https://docs.helm.sh/using_helm/#gke)[https://docs.helm.sh/using_helm/#gke].


```bash
$ kubectl create -f project/helm-setup/rbac-config.yaml
```

The you can install the Tiller service by doing:

```bash
$ helm init --service-account tiller
$HELM_HOME has been configured at /home/gavin/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.
Happy Helming!
```

If you now list the services in your cluster you will see a _tiller-deploy_.

```bash
$ kubectl get svc --namespace kube-system
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
default-http-backend   NodePort    10.31.253.33    <none>        80:30164/TCP    2h
heapster               ClusterIP   10.31.251.150   <none>        80/TCP          2h
kube-dns               ClusterIP   10.31.240.10    <none>        53/UDP,53/TCP   2h
kubernetes-dashboard   ClusterIP   10.31.250.203   <none>        443/TCP         2h
tiller-deploy          ClusterIP   10.31.253.1     <none>        44134/TCP       2h
```

## APPLICATION OVERVIEW

pic of wherre deploying
some overview of the config
some helm charts
deploy it
configure ingress
ssl
etc

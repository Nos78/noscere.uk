---
title: "Orchestrating Bare-Metal: High-Density K3s Cluster on Raspberry Pi Hardware"
description: "Deploying a lightweight, resilient Kubernetes runtime container cluster across mixed-generation ARM nodes with automated path configurations."
completionDate: 2026-05-15
technologies: ["Kubernetes", "K3s", "Raspberry Pi", "Linux", "Docker"]
githubUrl: "https://github.com/Nos78/k3s-cluster-manifests"
featured: true
role: "Systems Architect"
---

### Architecture Overview
This bare-metal container engine cluster is built using a decoupled controller/worker node architecture to optimize hardware execution bounds across strict resource limitations. 

### The Node Topology
* **Master Node (Control Plane):** Raspberry Pi 4 (4GB RAM) managing state logs and service meshes.
* **Worker Nodes (Compute Cluster):** 3x Raspberry Pi 3B (1GB RAM) running active pod runtimes.

### Infrastructure Breakthroughs
The primary technical challenge involved managing strict memory bounds on 1GB nodes. By stripping down standard k8s deployments and utilizing K3s with custom flannel flag constraints, idle consumption overhead was slashed by over 40%.

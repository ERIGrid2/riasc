---
id: network-emulation
title: Network Emulation
sidebar_label: Network Emulation
slug: /usage/network-emulation
---

## Introduction

These instructions gives the user more information how to use network emulation within specific pods. 

## Prerequisite

There is need to have some preparation ready before the network emulation will work. The important part is the mutating webhook installed to the Kubernetes. The examples can be found from repo git@github.com:ERIGrid2/k8s-netem.git and especially the directories of scripts and kubernetes inside that repository. 

Here are the needed commands when you are at root directory of k8s-netem repository. There might be needed to finetune aliases in scripts/dev.sh file for you environment:

    # Install aliases for running bash session
    source scripts/dev.sh

    # Create a new namespace for riasc system
    kubectl create ns riasc-system

    # Create self-signed certificate for mutating webhook
    create-webhook-cert

    # Build k8s-netem Docker image
    build-image

    # This part depends on your Docker image repository 

    # Add custom resource description for TrafficProfile resources
    kubectl apply -f kubernetes/crd.yaml

    # Register mutating webhook
    kubectl -n riasc-system apply -f kubernetes/rbac.yaml
    kubectl -n riasc-system apply -f kubernetes/deployment.yaml
    kubectl -n riasc-system apply -f kubernetes/service.yaml
    kubectl apply -f kubernetes/webhook.yaml

## TrafficProfile configuration

### TrafficProfile for Flexe

The below is one example for TrafficProfile configuration when used with Flexe traffic Emulator controller. This example describe TrafficProfile named "profile-flexe", which selects pod(s) with traffic-profile "profile-delay-jitter-flexe", has several specified netEm profiles: "ethernet", "3g" and "gprs", and every profile is running at specified times (runTime variable) and when all the profiles are run, then repeat the order again ("segments" -> repeat: true). There is also filtering configuration for egress interface gre1 ("interfaceFilter: gre1"), which filters packets destinated to "1.1.1.1/32" and using ports "443/TCP" or "53/UDP" and pods with the label "example". Another filter is using packets destinated to "8.8.8.8/32" and port "80/TCP". When packets destinated to those filtered destinations and ports, then this TrafficProfile is used for emulating network conditions.

    ---
    apiVersion: k8s-netem.riasc.eu/v1
    kind: TrafficProfile
    metadata:
    name: profile-flexe
    spec:
    interfaceFilter: gre1

    podSelector:
        matchLabels:
        traffic-profile: profile-delay-jitter-flexe

    type: Flexe

    parameters:
        segments:
        - repeat: true

        profiles:
        - name: ethernet
        parameters:
            runTime: 30

            bandwidthUp: 100000
            bandwidthDown: 100000
            delay: 0.25
            delayVariation: 0.25
            delayCorrelation: 0
            loss: 0
            lossCorrelation: 0
            duplication: 0
            corruption: 0
            reorder: 0
            reorderCorrelation: 0

        - name: 3g
        parameters:
            runTime: 30

            bandwidthUp: 256
            bandwidthDown: 256
            delay: 200
            delayVariation: 50
            delayCorrelation: 0
            loss: 0.5
            lossCorrelation: 0
            duplication: 0.1
            corruption: 0.1
            reorder: 0.2
            reorderCorrelation: 0

        - name: gprs
        parameters:
            bandwidthUp: 60
            bandwidthDown: 60
            delay: 350
            delayVariation: 100
            delayCorrelation: 0
            loss: 0.5
            lossCorrelation: 0
            duplication: 0.1
            corruption: 0.1
            reorder: 0.2
            reorderCorrelation: 0

        - name: lte
        parameters:
            bandwidthUp: 5000
            bandwidthDown: 15000
            delay: 7.5
            delayVariation: 5
            delayCorrelation: 0
            loss: 0.025
            lossCorrelation: 0
            duplication: 0
            corruption: 0
            reorder: 0
            reorderCorrelation: 0

        - name: xdsl
        parameters:
            bandwidthUp: 2000
            bandwidthDown: 15000
            delay: 7.5
            delayVariation: 2.5
            delayCorrelation: 0
            loss: 0
            lossCorrelation: 0
            duplication: 0
            corruption: 0
            reorder: 0
            reorderCorrelation: 0

    egress:
    - to:
        - ipBlock:
            cidr: 1.1.1.1/32

        - podSelector:
            matchLabels:
            component: example

        ports:
        - port: 443
        protocol: TCP
        - port: 53
        protocol: UDP

    - to:
        - ipBlock:
            cidr: 8.8.8.8/32

    - ports:
        - port: 80
        protocol: tcp

## Usage

When the modifications are done to file kubernetes/example/profile-flexe.yaml, then load that to the Kubernetes cluster. After that load also example deployment configuration (see kubernetes/example/deployment.yaml file). 

    source scripts/dev.sh

    kubectl create ns my-app

    # Create the example deployment and profile only for the first time
    kubectl -n my-app apply -f kubernetes/example/profile-flexe.yaml
    kubectl -n my-app apply -f kubernetes/example/deployment.yaml

    # Rebuild k8s-netem Docker image and restart example deployment
    example-run

    # Use the following commands to inspect the logs of the example deployment and webhook
    webhook-logs
    sidecar-logs
    example-logs ping-cloudflare
    example-logs ping-google


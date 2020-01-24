## Overview of architecture

In lab 1 we will be deploying a VPC, creating 2 subnets, adding instances and a NAT gateway, and setting up routing tables to define public and private subnets.

We will also look at an alternative way to access your instances, via systems manager.

The architecture is shown in the diagram below:

![Lab1 Architecture](img/lab1.png)

## Preparing the environment

### 1. Create a keypair in eu-west-1, account 1

[Create a keypair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair). You won't use it unless you want to SSH directly into the instance, but you cannot launch the instance without a keypair. In these labs, we will mostly be using SSM Session Manager to access instances.

Unless you already have used the name, give this keypair the name `KeyPair` to match the entry in the CloudFormation template.

---

## Building the environment

### 1. Create the Transit Gateway

* Give it the AS number `65000`.
* **Enable** DNS support and auto-accept shared attachments.
* **Disable** default route table association and default route table propagation.

### 2. Create Transit Gateway attachments

* Create attachments in both the boundary and private VPCs. Add a name tag for easier identification in future tasks.
* Make sure the attachment in the boundary VPC is placed in the **private** subnet, with IP range `192.168.2.0/24` and named `PrivateNATSubnet-BoundaryVPC`. 

### 3. Create and populate the Transit Gateway route table

* Create a main route table, with a name like `MeshRouteTable`
* Associate both attachments with that route table
* Either propagate both attachments to that route table, or enter routes in the table for the appropriate VPC CIDR ranges
* Add a **default route** to the Transit Gateway route table, pointing to the boundary VPC attachment

> [!TIP]
> A default route is a route entry that tells a routing table 'if you don't have a specific match for this packet, then send it on this way'. The standard way of expressing a default route in IP is to set the route to 0.0.0.0/0, and point this towards the next hop where you want the packet to go.

> 0.0.0.0/0 means match with any possible address.

> It is important to remember that a routing table will always match to the most specific route first. The order of the routes in a routing table is usually just in numerical sequence, and the routing decision is based on which route has the best match. This does mean that when routing tables get quite large, a lot of checking has to be done, since every entry has to be validated, at least the first time a packet is routed.

### 4. Update VPC route tables

* Add a **default route** to the Private VPC `(PrivateVPC1RT-PrivateVPC1)` route table, pointing to the Transit Gateway.
* Add a route to the boundary VPC **public** route table, pointing to the Transit Gateway for the CIDR range `10.0.0.0/8`. If you want to use the more explicit `10.0.0.0/16` route, you can, but it will mean adding an additional route in a later Lab.

### 5. Test everything

Use the same [testing matrix](https://www.networking-workshop.com/#/testingmatrix) as before, and log into each instance using Session Manager, and see what can ping to what, and which instances are able to reach the internet.

If the lab is working correctly, then everything should be able to ping everything else, and all instances should be able to connect to the Internet, with the exception of `192.168.1.100`.

## What if I can't get lab 1 working?

If you have tried to create the Transit Gateway, and are just not able to get the lab working successfully, then the last option is to delete all the implementation you have done (eg, Transit Gateway, attachments, and CloudFormation stack) and then run a single CloudFormation template which will create the entire lab, including all Transit Gateway components.

This is available as a template called `Lab1Complete_withTGW.yaml`, and only needs that you have created a keypair in order to run successfully. You can download the CloudFormation template for deploying a complete lab 1, including the Transit Gateway [here](https://d2x18vu72ugj64.cloudfront.net/Lab1Complete_withTGW.yaml) .




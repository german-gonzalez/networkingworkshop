# Intructions for Lab 1

![Lab1 Architecture](img/lab1.png)

## Preparing the environment

### 1. Create a keypair in eu-west-1, account 1

You wont need the keypair unless you want to ssh directly into the instance, but you cannot launch the instance without a keypair. In these labs, we will mostly be using SSM Session Manager to access instances.

Unless you already have used the name, give this keypair the name `KeyPair` to match the entry in the cloudformation template.

### 2. Launch the cloudformation template

Launch template `Lab1_Region1Acct1.yaml` and use the default entries. If you have not named your keypair `KeyPair` then change this parameter so it matches the name you provided.

### 3. Checking the launched stack

Once complete, check the following:

* your stack has created 2 VPCs, 3 subnets, 5 instances and an IAM role for SSM, which will include the characters `ssm`.

* in Systems Manager -> Managed Instances, you can see the 5 instances that were created, listed as being managed.

* connect into each one via Systems Manager -> Session Manager, and try and ping all the others, as well as checking Internet access via the NAT instance. To do this, issue the command `curl amazon.co.uk` in Linux, which should respond with an html header. Use the provided spreadsheet to record your results.

All instances in the `192.168.0.0/16` range should be able to ping one another, but the instance in the `10.0.1.0/24` range should be unreachable.

Also, the `curl` command should work from all instances except `192.168.1.100` and `10.0.1.100`

---

## Building the transit gateway

### 1. Create the transit gateway

* Give it the AS number `65000`
* **Enable** DNS support and auto-accept shared connections
* **Disable** default association and propagation

### 2. Create transit gateway attachments

* Create attachments in both the boundary and private VPCs
* Make sure the attachment in the boundary VPC is placed in the **private** subnet, with IP range `192.168.2.0/24`

### 3. Create and populate the transit gateway route table

* Create a main route table, with a name like `MeshRouteTable`
* Associate both attachments with that route table
* Either propagate both attachments to that route table, or enter routes in the table for the appropriate VPC CIDR ranges
* Add a **default route** to the transit gateway route table, pointing to the boundary VPC attachment

### 4. Update VPC route tables

* Add a **default route** to the Private VPC route table, pointing to the transit gateway
* Add a route to the boundary VPC **public** route table, pointing to the transit gateway for the CIDR range `10.0.0.0/8`. If you want to use the more explicit `10.0.0.0/16` route, you can, but it will mean adding an additional route in a later Lab.

### 5. Test everything

Use the same matrix as before, and log into each instance using session manager, and see what can ping to what, and which instances are able to reach the internet.

If the lab is working correctly, then everything should be able to ping everything else, and all instances should be able to connect to the Internet, with the exception of `192.168.1.100`.

## What if I can't get lab 1 working?

If you have tried to create the transit gateway,and are just not able to get the lab working successfully, then the last option is to delete all the implementation you have done (eg, transit gateway, aattachments, and cloudformation stack) and then run a single cloudformation template which will create the entire lab, including all transit gateway components.

This is available as a template called `Lab1Complete_withTGW.yaml`, and only needs that you have created a keypair in order to run successfully. 
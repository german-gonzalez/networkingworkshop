## Overview of architecture

In this lab, we will look at how to peer two transit gateways together in different regions.

![Lab4 Architecture](img/lab7.png)

## Preparing the environment

> [!DANGER]
>This lab is being run in the first account you used, but split between eu-west-1 and us-east-1. Make sure that you check you are in the correct region as you run each section.

### 1. Create a keypair in us-east-1, account 1

As previously, you don't need the keypair unless you want to ssh directly into the instance, but you cannot launch the instance without a keypair. Since keypairs are regional constructs, you will need to create a new keypair for us-east-1, account 1

Unless you already have used the name, give this keypair the name `KeyPair3` to match the entry in the cloudformation template.

### 2. Retrieve your SSM profile

Since IAM is a global construct, you do not need to create a new SSM profile for assigning to the instance you will launch. However, you will need to retrieve that profile name for use in the second region.

To find the profile, go to the CloudFormation stack in the first region, that you launched in lab 1, and look at the outputs. One of the output values should be for the SSM profile. Copy this, as you will need to paste it into the CloudFormation template you are about to launch. **However, make sure you copy the profile, and not the role!**

### 3. Launch the CloudFormation template

> [DANGER]
> Make sure you launch the template in **us-east-1**, not in **eu-west-1**

Launch template `Lab4_Region2Acct1.yaml` and use the default entries, bearing in mind the items below.

To download the CloudFormation template for setting up lab 4, [click here](https://d2x18vu72ugj64.cloudfront.net/Lab4_Region2Acct1.yaml) .

* If you have not named your keypair `KeyPair3` then change this parameter so it matches the name you provided.
* Paste in the name of the SSM profile that you found from the CloudFormation output in Lab 1. **Note: you are looking for the profile, not the role.**

### 3. Checking the launched stack

Once complete, check the following:

* Your stack has created 1 VPC, 1 subnet and 1 instance.

* In Systems Manager -> Managed Instances, you can see the instance that was created, listed as being managed.

* Connect into the new instance in us-east-1 via Systems Manager -> Session Manager, and try and ping all the others, as well as checking Internet access via the NAT instance. To do this, issue the command `curl amazon.co.uk` in Linux. Use the provided [testing matrix](https://www.networking-workshop.com/#/testingmatrix) to record your results.

The instance should not be able to reach any others, nor communicate with the Internet.

---

## Peering the TGWs between the regions

### 1. Create the Transit Gateway peer attachment

* In **us-east-1** find the new Transit Gateway created by the preparation CloudFormation stack, and copy its tgw-ID
* In **eu-west-1** create a new attachment for the Transit Gateway of type `peer`, and point it towards the Transit Gateway that has just been created in **us-east-1**. You will need to enter the region, and then the specific tgw-ID that you captured in the previous step.
* Go back to **us-east-1**, then select and accept the peering attachment. This may take a minute or so to appear, and then several minutes to move from `initiating` to `pending` to `attached`. 

    *You need to specifically go to the details of the attachment in **us-east-1** in order to accept the attachment.*

### 2. Updating the boundary_access route table

In **eu-west-1** find the `boundary_access` route table that you created in lab 3.  Associate the peer attachment to this route table. Remember, associating the attachment to a table tells the Transit Gateway that this table is used for making route decisions on packets **coming in** to that attachment from a VPC. As such, packets coming across from the second region Transit Gateway will be able to access the boundary VPC and the internet (via the NAT instance)

### 3. Updating the private_access route table

Since the VPC in region 2 has been configured as one of private VPCs, a route is needed so that traffic being returned by the NAT instance can get to the VPC. 

To do this, add a static route to the `private_access` route table, pointing subnet `10.2.0.0/16` via the peer connection.

### 4. Updating the Transit Gateway route table in us-east-1

Having created the peer connection between the two Transit Gateways, we still need to attach it in **us-east-1**

Within the Transit Gateway route table (just created) in **us-east-1** make sure you associate the peer attachment to it, and then enter a default route (`0.0.0.0/0`), via the peer attachment.

### 5. Update Boundary VPC route tables

In the public subnet route table for the boundary VPC, make sure you used the route summary of `10.0.0.0/8` via the Transit Gateway attachment. If you used more specific routes (eg `10.0.0.0/16` and `10.1.0.0/16`) then you will need to add a new route `10.2.0.0/16`, also via the Transit Gateway attachment.

### 6. Test everything

Use the same [testing matrix](https://www.networking-workshop.com/#/testingmatrix) as before, and log into each instance in both accounts and both regions using session manager, and see what can ping to what, and which instances are able to reach the internet.

If the lab is working correctly, then everything should be able to ping instances in the `192.168.0.0/16` range, and private VPCs (and `192.168.2.100`) should be able to connect to the Internet

As before `192.168.1.100` should not be able to reach the Internet, and instances in the `10.0.0.0/8` ranges should not be able to ping one another.

> [!DANGER]
> If you were unable to complete lab3 successfully, then it may be that instances in the `10.0.0.0/16` and `10.1.0.0/16` networks can still talk to each other. That's fine, it just means you need to expect that to be different from the testing matrix results. The aim of this lab is to set up inter-region peering and prove that you can reach the NAT instance from the second region.


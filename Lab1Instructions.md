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

### 1. Create the VPC and associated components

In this section, you will need to select an CIDR range (use `10.x.0.0/16` for the VPC, where x is given to you by the presenter) and then configure the VPC with public and private subnets in that range. To do this, you will need to:

- Create the VPC
- Create the 2 subnets
- Create route tables for each subnet (public and private)
- Associate the subnets with the appropriate route tables
- Create an Internet Gateway, and associate it with the VPC
- Add a default route to the public subnet, via the IGW

### 2. Create the NAT gateway and update route tables

In this section, you will need to create a NAT gateway and make it usable by the private subnet. To do this, you will need to:

- Create an Elastic IP, for use by the NAT gateway
- Create the NAT gateway in the public subnet
- Update the route table for the private subnet in order to point to the NAT gateway as its default route

### 3. Create instances and test access

Now we are ready to create 2 test instances, as follows:

- Create the first instance in the public subnet, with a public IP, so that it can talk directly to the internet. 
    - Use the keypair you previously created at the beginning of this lab.
    - During creation, also create a security group that allows ssh inbound from the Internet

- Create a second instance, in the private subnet. This instance will use the NAT gateway to talk to the Internet, and does not need a public IP address. 
    - Again, use the keypair you created at the beginning of this lab.
    - You should be able to use the previous security group created whilst making the first instance for ssh inbound

It is also useful to add either ICMP to the ssh security groups, or even to create a new security group with ICMP in it, and add it to the instance. That way, you will allow ping traffic between instances

### 4. Test everything

Test access to the instances. You should be able to ssh directly to the instance in the public subnet, but how do you get to the instance in the private subnet?

Why wont the instances ping one another? How do you fix that?

Can they both talk to the Internet?
```
curl amazon.co.uk
```

What is your public IP?
```
curl ifconfig.me
```

---

## Other ways to connect to instances

One of the limitations of connecting to instances via their public address is that it either requires every instance to have a public address, or alternatively, you have to log into a jump box, and then jump from one instance to another.

This is all very well if the network is working and established, but if you are trying to use the instances to check the network, then that becomes an issue! How do you ssh from one instance to another if the network isn't working yet.

One of the easiest ways around this, and also a chance to learn a useful network tool, is to use privatelink endpoints. These put service network interfaces inside the VPC, and allow you to connect to services as if they are local to your CIDR. 

We will use one of these to connect to the instances, using AWS Systems Manager.

### 1. Setting up Systems Manager

There are several things that need to be in place for login to instances via systems manager, and you will need to deploy these. You will need to do the following

1. Create an instance profile, a role and a policy to apply to an instance. The easiest way to do this is through quick setup....you dont even need to identify an instance. just open quick setup, and it will create the instance profile for you
2. create ssm and ssmmessages endpoints in the vpc, and apply default SG so that instances can talk to it
3. wait for the endpoints to come alive
4. launch an instance, and make sure it has the ssminstance role, and is in the default SG
5. go to systems manager - session manager and start a session

You can also connect to an instance using the aws command line, if you have installed the plug-in on your computer.

Once you log in to an instance, you can use the command `bash` and it will set the instance prompt to the IP address of the primary interface. This makes it easier to identify which instance you are looking at.


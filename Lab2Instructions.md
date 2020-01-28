## Overview of architecture

In Lab 2, we will be adding another VPC, and peering it to the first one.

![Lab2 Architecture](img/lab2.png)

Peering allows 2 VPCs to communicate with one another, but does not allow one VPC to act as a route through which a further VPC can be accessed. This is known as 'non-transitive routing' within AWS.

This function is based on a simple concept, that for data to be forwarded in a VPC, either the source or destination interface (ENI) must be within the VPC. If neither the source or destination ENI is inside the VPC then the traffic is dropped.

---

## Preparing the environment

To prepare the environment, you will need another VPC deployed within your account. This time you do not need Internet access, so simply deploy a new VPC with a private subnet. Make sure that the address range of the new VPC does not overlap with the current one.

As a reminder, to create a VPC, you will need to:

- Create the VPC
- Create a subnet
- Create route tables for that subnet 
- Associate the subnet with the route table
- Create an instance in the subnet
    - remember to create an ssh and icmp security group when doing this
- Create the ssm and ssmmessages endpoints in the vpc, and apply default SG so that instances can talk to it
- Wait for the endpoints to come alive
- Add the ssminstance role to the instance, and make sure it is in the default SG
- Go to systems manager - session manager and start a session to check you can access it


At this point, you should now have two subnets, in two different VPCs, with instances that do NOT have overlapping addresses, but that cannot ping one another.


---

## Peering the VPCs to one another

For this lab, we will now peer the two VPCs together. This is a negotiated process, as follows:

- The first VPC requests the peer with the second
- The second VPC accepts the peer

Whilst this establishes the peer betwen the VPCs, that is simply creating a 'possible route' for traffic to traverse. We have to explicitly add the routes to the route tables of the subnets to allow this traffic to flow.

As an experiment, since the first VPC that was created in lab 1 has 2 seperate subnets, add the route to only one of them, to prove that you can then only ping the instance in the subnet that you added to the table.


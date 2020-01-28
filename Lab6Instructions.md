## Overview of architecture

In Lab 5 we will be moving from a mesh architecture, where all VPCs can talk to one another, to a hub and spoke architecture, where several spoke VPCs can talk to a hub VPC, but not to each other.

![Lab5 Architecture](img/lab6.png)

Note that you are now going to be working mostly back in the first account, and will only be using the second account for testing. Depending on your browser, you may need to either use a private (incognito) browser, or use a different browser (eg using Firefox for account 1 and Safari for account 2).

---

## Preparing the environment

> [!TIP]
> As long as lab 4 is working successfully for you, then there is no preparation for lab 5.

## Moving to a hub and spoke architecture

In order to move from a mesh to a hub and spoke architecture, we will need to create new route tables, and move all the associations and propagations from the existing one. It is important to note that whilst an attachment **can** be propagated to multiple route tables, it **cannot** be associated with more than one. As such, if you try to associate an attachment with a new route table before disassocciating it from the existing one, the operation will fail.

### 1. Creating new Transit Gateway route tables

* Create a TGW route table called `boundary_access` which will be used by the private VPCs to access the boundary VPC.
* Create a TGW route table called `private_access` which will be used by the boundary VPC to access the private VPCs.
* Remove all associations from the original mesh route table. Propagations can stay if you want, as they have no effect if the route table is not being used.

### 2. Updating the boundary_access route table

* Associate the two private VPCs with the `boundary_access` route table. Remember, associating the attachment to a table tells the Transit Gateway that this table is used for making route decisions on packets **coming in** to that attachment from a VPC.
* Propagate the boundary VPC attachment into the `boundary_access` route table, so that packets from the private VPCs know how to get to the `192.168.0.0/16` range
* Add a default route into the `boundary_access` route table so that packets coming in from the private VPCs, with destinations on the Internet, know to be forwarded via the NAT gateway

> [!TIP]
> The propagation of the boundary VPC into the `boundary_access` route table is not strictly needed, as the default route would do that job anyway. However, it's worth adding, just so you know its there. Not all solutions for customers will be for access to everything. Sometimes, they will use this architecture to create shared services VPCs instead.

* Add a **blackhole route** to the `boundary_access` route table, so that packets coming from one of the private VPCs with a destination of the other private VPC are dropped.

### 3. Updating the private_access route table

* Associate the boundary VPCs with the `private_access` route table. 

* Propagate the private VPCs attachments into the `private_access` route table, so that packets from the boundary VPC know how to get to the `10.0.0.0/16` and `10.1.0.0/16` ranges

### 4. Test everything

Use the same [testing matrix](https://www.networking-workshop.com/#/testingmatrix) as before, and log into each instance using session manager (in both accounts), and see what can ping to what, and which instances are able to reach the internet.

If the lab is working correctly, then everything should be able to ping instances in the `192.168.0.0/16` range, and private VPCs (and `192.168.2.100`) should be able to connect to the Internet

As before `192.168.1.100` should not be able to reach the Internet, and instances in the `10.0.0.0/8` ranges should not be able to ping one another.


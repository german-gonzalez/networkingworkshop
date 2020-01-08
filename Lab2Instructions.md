## Overview of architecture

In Lab 2, we will be adding another VPC, but from a different account

![Lab2 Architecture](img/lab2.png)


Note that you are now going to be working in a second account. Depending on your browser, you may need to either use a private (incognito) browser, or use a different browser (eg using firefox for account 1 and safari for account 2).

Otherwise, you may find that when you log into account 2, it changes the account that all browsers in that session are logged in to. Keep an eye out for this!!!

---

## Preparing the environment

> [!DANGER]
> You should now be working in account 2

### 1. Create a keypair in eu-west-1, account 2

You wont need the keypair unless you want to ssh directly into the instance, but you cannot launch the instance without a keypair. In these labs, we will mostly be using SSM Session Manager to access instances.

Unless you already have used the name, give this keypair the name `KeyPair2` to match the entry in the cloudformation template.

### 2. Launch the cloudformation template

Launch template `Lab2_Region1Acct2.yaml` and use the default entries. If you have not named your keypair `KeyPair2` then change this parameter so it matches the name you provided.

To download the cloudformation template for setting up lab 2, [click here](https://networking-workshop.s3-eu-west-1.amazonaws.com/Lab2_Region1Acct2.yaml)

To download the template from workdocs [click here](https://amazon.awsapps.com/workdocs/index.html#/document/4529801924a0bbaa89b0c550865c1d773b679cb1e4691335b9fbc59f15ea1372)

### 3. Checking the launched stack

Once complete, check the following:

* your stack has created 1 VPC, 1 subnet, 1 instance and an IAM role for SSM, which will include the characters `ssm`.

* in Systems Manager -> Managed Instances, you can see the instance that was created, listed as being managed.

* connect into each instance in both account 1 and account 2 via Systems Manager -> Session Manager, and try and ping all the others, as well as checking Internet access via the NAT instance. To do this, issue the command `curl amazon.co.uk` in Linux, which should respond with an html header. Use the provided [testing matrix](https://www.networking-workshop.com/#/testingmatrix) to record your results.

All instances in the `192.168.0.0/16` range should be able to ping one another, as well as the instance in the `10.0.1.0/24` range.

Also, the `curl` command should work from all instances except `192.168.1.100` 

Nothing should be able to reach the instance in the `10.1.1.0/24` range, and likewise, it should not be able to reach any other instances. Nor should it be able to reach the Internet.

---

## Extending the TGW to the new VPC

> [!TIP]
> You will now be swapping between accounts 1 and 2. Pay attention to which account you are in as you go through the steps. 

### 1. Share the transit gateway

* Using Resource Access Manager in account 1, share the transit gateway with account 2. These accounts do not need to be in the same Organization, and you can explicitly share the account, rather than at an OU or Organization level.

* Accept the share in the second account. Until you explicitly do this, it will not be available for you. Once accepted, you should see a new transit gateway in account 2, without a name. Give it one if you want to.

> [!TIP]
> If you enabled auto-accept attachments when you created the transit gateway, then all should work fine. 

> However, if you didn't enable it, then once you have shared the transit gateway with the second account, and created the attachment in the second account, you will need to go back to the first account and `accept` the attachment.

### 2. Create an attachment to the new VPC

* Create the attachment to Private VPC2 in account 2. You will need to be in account 2 do do this, since the new VPC is owned by that account. However, you will notice that there are no routing tables in account 2, and you cannot create one. This is because the route table is owned by the transit gateway, which in turn is owned by account 1

### 3. Update the transit gateway route table

* Back in account 1, associate the new attachment with the main route table you created in Lab 1

* Either propagate that attachment into the main route table, or add a route to the `10.1.1.0/24` range, directly into the route table. Either option will have the same effect.

### 4. Update VPC route table

* Add a **default route** to the Private VPC 2 route table (in account 2), pointing to the transit gateway. 

*You do not need to update the route table in the boundary VPC, if you used the range `10.0.0.0/8` for the route to private VPCs. However, if you used the more explicit `10.0.0.0/16` route, then you will also need to add the `10.1.0.0/16` route to the boundary VPC route table

### 5. Test everything

Use the same [testing matrix](https://www.networking-workshop.com/#/testingmatrix) as before, and log into each instance using session manager (in both accounts), and see what can ping to what, and which instances are able to reach the internet.

If the lab is working correctly, then everything should be able to ping everything else, and all instances should be able to connect to the Internet, with the exception of `192.168.1.100`.


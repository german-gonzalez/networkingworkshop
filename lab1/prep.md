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


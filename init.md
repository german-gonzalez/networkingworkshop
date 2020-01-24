# Networking Workshop

This workshop is intended to deploy the following items during the 5 labs

- Basic VPC design, including public and private subnets, and NAT gateways
- Peering of two VPCs and route configuration, to allow instances in different VPCs to communicate
- Transit Gateway in a single region and account
- Adding an additional VPC, from a different account
- Using route tables to isolate traffic
- Extending the transit gateway to a different region
- Configuring a VPN to permit on premise connectivity to a single VPC, and to a transit gateway
- Mirroring traffic to monitor what is going through the NAT instance

During the exercise, the first 2 labs will create an environment that looks like this

![image](_media/architecture.png)

labs 3-6 will result in a final architecture will look like this

![image](_media/architecture.png)

Lab 7 will add an on-premise component, initially to one VPC, and then to the transit gateway created in lab 6.

Lab 8 will move into monitoring data flow via traffic mirroring.

This workshop is intended to be run in conjunction with presentation slides, as multiple modules.

> [!TIP]
> If you are already familiar with building a VPC and peering them together, then you can start this entire workshop from lab 3.

Also, at the beginning of some modules, there will be a level of setting up needed that uses a CloudFormation script to create the environment. Please make sure you are able to launch CloudFormation scripts in your account.

> [!DANGER]
> If you are using a brand new account, an account that has not been used for some time, or an account that is regularly used, but a region that you have not used before, be aware that it may take some time (usually 30 minutes, but up to 4 hours) for it to become possible to launch an instance. 

> As such, it is worth preparing for this set of labs by simply launching an instance in the regions you will use (**us-east-1** and **eu-west-1**) prior to starting. The instance can be launched in any VPC to simply reactivate the account/region.


## Overview of architecture

In lab 8 we will be adding a VPN tunnel onto the transit gateway, so as to connect (ping) an 'on-premise' server, as shown in the diagram below:

![Lab8 Architecture](img/lab8.png)

In reality, the 'on-premise server' will either be a Linux instance running in a VPC in another account, or a Cisco CSR that you set up in another VPC. In either case, this is just to simulate a router that can support a VPN tunnel.

In this case, we will use dynamic routes to connect to the VPN termination device and ping the far-end server, and BGP to exchange those routes between AWS and the far end VPN device. 

## Preparing the environment


## SQL to set up the initial tables


    CREATE EXTERNAL TABLE IF NOT EXISTS vpc_flow_logs (
      version int,
      account string,
      interfaceid string,
      sourceaddress string,
      destinationaddress string,
      sourceport int,
      destinationport int,
      protocol int,
      numpackets int,
      numbytes bigint,
      starttime int,
      endtime int,
      action string,
      logstatus string
    )  
    PARTITIONED BY (dt string)
    ROW FORMAT DELIMITED
    FIELDS TERMINATED BY ' '
    LOCATION 's3://perry-flowlog-dump/AWSLogs/748538096725/vpcflowlogs/eu-west-1/'
    TBLPROPERTIES ("skip.header.line.count"="1");

## SQL to create partition for day

    ALTER TABLE vpc_flow_logs
    ADD PARTITION (dt='2019-12-04')
    location 's3://perry-flowlog-dump/AWSLogs/748538096725/vpcflowlogs/eu-west-1/2019/12/04';

## SQL to create table of top receivers for http or https

    SELECT SUM(numbytes) AS bytecount,
            destinationaddress,
            sourceport
    FROM vpc_flow_logs
    WHERE sourceport = 443 OR sourceport = 80
    GROUP BY  destinationaddress, sourceport
    ORDER BY  bytecount DESC LIMIT 20;

## SQL to calculate to data generator (/2 so we dont include send and receive data)

    SELECT SUM(numbytes/2/1024/1024) AS MBcount,
            destinationaddress
    FROM vpc_flow_logs
    GROUP BY  destinationaddress
    ORDER BY  MBcount DESC LIMIT 20;

## SQL to delete table

    DROP TABLE `vpc_flow_logs`;
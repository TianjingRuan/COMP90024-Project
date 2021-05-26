#!/bin/bash

. ./unimelb-comp90024-2021-grp-56-openrc.sh; ansible-playbook deploy_couchdb_cluster.yaml -i inventory/application_hosts.ini

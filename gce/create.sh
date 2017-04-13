kubectl delete -f nodeloadtest-gce-deployment.yaml
kubectl delete -f nodeloadtest-gce-service.yaml
kubectl create -f nodeloadtest-gce-deployment.yaml
kubectl create -f nodeloadtest-gce-service.yaml --validate=false


 # requests:
 #    cpu: 70m
 #    memory: 160Mi
 #  limits:
 #    cpu: 110m
 #    memory: 200Mi
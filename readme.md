npm install @omtechservices/library@1.0.7 

Docker Cmd
docker build -t "amitmpatel27/statitt.settings" .
--docker run amitmpatel27/statitt.oidc
--Create port map

docker run -d -p 3002:3002 --name statitt.odic amitmpatel27/statitt.settings


Kubernaties

kubectl get pods
kubectl delete -f infra/k8s/
kubectl apply -f infra/k8s/services-depl.yaml
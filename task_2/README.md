# Node.js Homework 2

## Event Loop

- Recreate code from presentation:
```
$ node ./examples/micro_macro_tasks.js
$ node ./examples/child_process.js
$ node ./examples/lib_uv_threads.js
```
- Сode that may behave differently on different runs (1 file)
```
$ node different_behave.js
```
- Write server with api that blocks loop (and prove it) 
```
$ node loop_with_blocking.js
```
> In another tabs start and repeat command
```
$ curl localhost:3000
```
- Same api non-blocking
```
$ node loop_without_blocking.js
```
## Clusters
- Recreate code from presentation:
```
$ node ./examples/cluster.js
$ node ./examples/worker_threads.js
$ node ./examples/fork.js
```
- Create cluster with 6 workers. Run small server with some api. Run script that performs 100 calls to this server. Calculate on server how many requests handled each worker.
```
$ node cluster.js
```
> In new tab perform this command
```
$ node ../utils/loadServer.js
```
## Workers
- Calculate n-th Fibonacci number on worker thread (can be as api) (1 or 2 files)
```
$ node worker_server.js
```
> In new tab perform this command where YOUR_NUMBER = number which you want to calculate
```
$ curl 'localhost:3000?number=YOUR_NUBMER
```
- Calculate n-th Fibonacci number on child process (can be as api) (2 files)
```
$ node process_parent.js
```
> In new tab perform this command where YOUR_NUMBER = number which you want to calculate
```
$ curl 'localhost:3000?number=YOUR_NUBMER
```
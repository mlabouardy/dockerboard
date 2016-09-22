## Dockerboard [![Build Status](https://travis-ci.org/mlabouardy/docker-ui.svg?branch=master)](https://travis-ci.org/mlabouardy/docker-ui)

Web UI to manage docker containers, images, private registries and create docker compose templates  ...

http://vps310148.ovh.net:8000

## Quickstart

```sh
docker run -d -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name dockerboard mlabouardy/dockerboard:5.0
```

## Mobile application

https://github.com/mlabouardy/dockerboard-android

## Screenshots

<p align="center">d
  <img src="screenshots/1.png" width="25%"/>
  <img src="screenshots/2.png" width="25%"/>
  <img src="screenshots/3.png" width="25%"/>
  <img src="screenshots/4.png" width="25%"/>
  <img src="screenshots/5.png" width="25%"/>
  <img src="screenshots/6.png" width="25%"/>
</p>

## Docker Images

Image | Tag
------------ | -------------
mlabouardy/dockerboard | 5.0
mlabouardy/dockerboard | 4.0
mlabouardy/dockerboard | 3.0
mlabouardy/dockerboard | 2.0
mlabouardy/dockerboard | 1.0

## Contributors

Mohamed Labouardy <mohamed@labouardy.com>

## Help

If you run into issues, please don't hesitate to find help on the GitHub project.

## License

The Dockerboard project is covered by the MIT License.

The MIT License (MIT)

Copyright (c) 2016 Mohamed Labouardy and contributors to the Dockerboard project.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

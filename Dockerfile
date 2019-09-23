FROM ubuntu:18.04
RUN apt-get update 
RUN  apt-get install -y --no-install-recommends ca-certificates cmake git libcurl4-openssl-dev \
      build-essential libxmu-dev libxi-dev libgl-dev libglew-dev

RUN apt-get install -y  \
        libqt5concurrent5 \
        libqt5core5a \
        libqt5dbus5 \
        libqt5gui5 \
        libqt5multimedia5 \
        libqt5network5 \
        libqt5opengl5 \
        libqt5opengl5-dev \
        libqt5qml5 \
        libqt5quick5 \
        libqt5quicktest5 \
        libqt5script5 \
        libqt5scripttools5 \
        libqt5svg5 \
        libqt5svg5-dev \
        libqt5widgets5 \
        libqt5xml5 \
        pyqt5-dev \
        python3-pyqt5 \
        python3-pyqt5-dbg \
        qt5-default \
        qt5-qmake \
        qt5-image-formats-plugins \
        qtdeclarative5-dev \
        qtdeclarative5-dev-tools \
        qtdeclarative5-models-plugin \
        qtdeclarative5-qtquick2-plugin \
        qtdeclarative5-window-plugin \
        qttools5-dev-tools \
        qttools5-dev

RUN git clone https://github.com/cnr-isti-vclab/vcglib /usr/src/vcglib
RUN git clone https://github.com/cnr-isti-vclab/corto /usr/src/corto
RUN cd /usr/src/corto && mkdir build && cd build && cmake .. && make && make install


RUN mkdir /usr/src/app

WORKDIR /usr/src/app
RUN git clone https://github.com/DerouineauNicolas/nexus /usr/src/app/

RUN mkdir build && cd build && cmake .. && make -j 2
ENV PATH /usr/src/app/build/src/nxsbuild:/usr/src/app/build/src/nxsedit:$PATH
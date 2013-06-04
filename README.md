
this is the code for the node.js part at my NDC 2013 talk


# Pipe data from video to player
Prerecorded, no slides

# Pipe video from drone to player
Show slide
Show that droneVideoStream is a stream made of streams
![test slide](https://github.com/bjartwolf/ndc-2013-streams/blob/master/presentation/20130530_123049.jpg)

# Pipe video to file
Show slide
Play video if time

# Pipe data to a database as well
Using logdata.js
   
# Play back again if time using playDroneData.js
No slides, just piping data out again
Consider using a slowpipe for piping slowly.

# Show facedetection stream
Show slide
Introduce different types in data, JSON objects, buffers, strings 
Very much like an eventemitter with objects (but with pause and buffering etc)

# Introduce Rx  
Can pipe this object-type stream into Rx for processing
(this will break things as buffering and backpressure, this is just a hack I'm doing)
Especially when writing from Rx back into a pipe.... Hopefully someone smart does this one day in a robust way. 





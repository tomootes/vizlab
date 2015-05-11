require 'socket'

contents = File.read('data/angry.tsv')

lines = contents.split("\n")

server = TCPServer.new 27016 # Server bind to port 2000

loop do
  client = server.accept    # Wait for a client to connect
  lines.each { |x|
    sleep(0.01) 
    client.puts x 
  }
  client.close
end



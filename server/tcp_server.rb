require 'socket'
require 'csv'

a = TCPServer.new('', 27015) # '' means to bind to "all interfaces", same as nil or '0.0.0.0'
loop {
  connection = a.accept
  puts "received:" + connection.recv(1024)
  parsed_file = CSV.read("../data/angry.csv", { :col_sep => "\t" })
  connection.write parsed_file
  connection.close
}
import asyncio
import websockets
import json

async def handle_client(websocket):
    print("Client connected", websocket.remote_address)
    try:
        while True:  # Keep the connection open
            try:
                message = await websocket.recv()
                print("Received ",message)
                for client in connected_clients:
                    if client != websocket:  # Don't send back to the sender
                        try:
                            await client.send(message) # Send JSON data
                        except Exception as e:
                            print(f"Error broadcasting to client: {e}")
                            connected_clients.remove(client) # Remove dead clients

            except websockets.exceptions.ConnectionClosedError:
                print(f"Client disconnected: {websocket.remote_address}")
                break # Exit the loop when a client disconnects
            except Exception as e:
                print(f"Error handling client message: {e}")
                break

    finally:

        connected_clients.remove(websocket) # Clean up after client disconnects
        print(f"Connection closed for: {websocket.remote_address}")
    

connected_clients = set()
    

async def main():
    async def handler(websocket):
        connected_clients.add(websocket) # Add to connected clients
        await handle_client(websocket)  # Handle client in a separate coroutine

    async with websockets.serve(handler, "", 8765):
        print("WebSocket server started on ws://192.168.96.120:8765")
        await asyncio.Future()  # Run forever

asyncio.run(main())

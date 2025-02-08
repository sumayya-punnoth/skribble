import asyncio
from websockets import serve

async def hello(websocket):
    async for message in websocket:
        message = await websocket.recv()
        print("recieved", message)
        await websocket.send(message)
        print("sent")
        #e=await websocket.recv()
        #print(ne)
    new=await websocket.recv()
    print(new)
    await websocket.send(new)
    print(new)

    

async def main():
    async with serve(hello,"",8765) as server:
        await asyncio.get_running_loop().create_future()

asyncio.run(main())

async def run(context, input):
   async for id in input:
      yield f"id:{id}"
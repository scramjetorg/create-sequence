async def run(context, input):
	async for chunk in input:
		yield chunk
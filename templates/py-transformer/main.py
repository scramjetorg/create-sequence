import asyncio

async def get_db_entry_for_id(data):
	result = "Your result: " + data + "\n"
	return result
	
async def run(context, input):
	async for chunk in input:
		yield await get_db_entry_for_id(chunk)

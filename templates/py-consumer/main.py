import asyncio

async def save_entry_to_db(data):
    return "saved"
    
async def run(context, input):
    async for chunk in input:
        await save_entry_to_db(chunk)

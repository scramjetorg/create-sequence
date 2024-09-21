import asyncio

def get_page_from_api():
    return "Your result \n"

async def run(context, input):
    while True:
        for result in get_page_from_api():
            yield result
        await asyncio.sleep(5)

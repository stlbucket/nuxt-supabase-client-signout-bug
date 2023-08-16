export default defineEventHandler((event) => {
  console.log('HEADERS', event.node.req.headers)
  return {
    cookieHeader: event.node.req.headers['cookie']
  }
})

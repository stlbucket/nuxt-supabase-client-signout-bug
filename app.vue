<template>
  <div style="display: flex;">
    <div style="display: flex; flex-direction: column;">
      <div>
        <button @click="onLogin" :disabled="user">Login</button>
        <button @click="onLogout" :disabled="!user">Logout</button>
      </div>
      <div>{{ email }}</div>
      <pre>{{ JSON.stringify(user,null,2) }}</pre>
    </div>
    <div style="display: flex; flex-direction: column;">
      <div>
        <button @click="onGetCookieHeader">Get Cookie Header On Server</button>
      </div>
      <pre>{{ JSON.stringify(pong,null,2) }}</pre>
    </div>
  </div>
</template>


<script lang="ts" setup>
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const email = ref('test@example.com')

  const pong = ref()

  const onLogin = async () => {
    const { error } = await client.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000'
      }
    })
    if (error) {
      alert(error.message)
    }
    alert('Check your email inbox for the magic link!')
    navigateTo('http://localhost:54324/monitor', {external: true})
  }

  const onLogout = async () => {
    await client.auth.signOut()
  }

  const onGetCookieHeader = async () => {
    const { data } = await useFetch('/api/cookie-header')

    pong.value = data.value
  }
</script>
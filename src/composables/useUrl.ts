import { useRoute, useRouter } from 'vue-router'

export default function useUrl() {
  const router = useRouter()
  const route = useRoute()

  function removeUrlQuery(pathName: string, key: string) {
    const query = { ...route.query }

    delete query[key]

    router.replace({ name: pathName, query })
  }

  function setUrlQuery(pathName: string, key: string, value: string) {
    const query = { ...route.query, [key]: value.trim() }

    router.replace({ name: pathName, query })
  }

  return { removeUrlQuery, setUrlQuery }
}

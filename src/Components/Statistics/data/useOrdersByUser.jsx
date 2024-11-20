import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useOrdersByUser() {
  const { orders, profile } = useContext(DataContext)

  const ordersByUser = useMemo(() => {
    const result = orders.reduce((acc, order) => {
      const existingUser = acc.find(
        (item) => item.profile_id === order.profiles?.id
      )
      if (existingUser) {
        existingUser.count += 1
        existingUser.amount += order.total
      } else {
        const userProfile = profile.find((p) => p.id === order.profiles?.id)
        acc.push({
          profile_id: order.profiles?.id,
          username:
            userProfile?.first_name + " " + userProfile?.last_name || "Unknown",
          count: 1,
          amount: order.total,
        })
      }
      return acc
    }, [])

    return result.sort((a, b) => b.count - a.count).slice(0, 10)
  }, [orders, profile])
  return ordersByUser
}

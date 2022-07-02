import siteMetadata from "@/data/siteMetadata"

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  // fr-CA for ISO dates
  const now = new Date(date).toLocaleDateString("fr-CA", options)

  return now
}

export default formatDate

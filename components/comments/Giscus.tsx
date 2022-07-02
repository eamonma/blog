import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import GiscusComponent, { BooleanString, GiscusProps, Mapping } from "@giscus/react"

import siteMetadata, { comment } from "@/data/siteMetadata"

const Giscus = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ""
      ? theme === "dark" || resolvedTheme === "dark"
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = "comments-container"

  const giscusProps = useMemo<GiscusProps>(
    () => ({
      ...siteMetadata?.comment?.giscusConfig,
      repo: siteMetadata.comment.giscusConfig.repo as `${string}/${string}`,
      id: "comments",
      repoId: siteMetadata.comment.giscusConfig.repositoryId,
      reactionsEnabled: siteMetadata.comment.giscusConfig.reactions as BooleanString,
      emitMetadata: siteMetadata.comment.giscusConfig.metadata as BooleanString,
      mapping: siteMetadata?.comment?.giscusConfig as unknown as Mapping,
      inputPosition: "top",
      lang: "en",
      loading: "lazy",
      theme: commentsTheme,
    }),
    [commentsTheme]
  )

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repositoryId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", mapping)
    script.setAttribute("data-reactions-enabled", reactions)
    script.setAttribute("data-emit-metadata", metadata)
    script.setAttribute("data-input-position", inputPosition)
    script.setAttribute("data-lang", lang)
    script.setAttribute("data-theme", commentsTheme)
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ""
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame")
    if (!iframe) return
    console.log(iframe)

    LoadComments()
  }, [LoadComments])

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {/* {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
      <div className="giscus" id={COMMENTS_ID} /> */}
      <GiscusComponent {...giscusProps} />
    </div>
  )
}

export default Giscus

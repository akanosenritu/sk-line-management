import React from "react"

export const TabPanel = (props: {children: React.ReactNode, tabIndex: number, currentIndex: number}) => {
  return <div
    hidden={props.tabIndex !== props.currentIndex}
  >
    {props.children}
  </div>
}
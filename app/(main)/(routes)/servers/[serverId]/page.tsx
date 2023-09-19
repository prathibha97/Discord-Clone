import { FC } from 'react'

interface ServerIdPageProps {
  params:{
    serverId: string
  }
}

const ServerIdPage: FC<ServerIdPageProps> = ({params}) => {
  return <div>ServerIdPage</div>
}

export default ServerIdPage
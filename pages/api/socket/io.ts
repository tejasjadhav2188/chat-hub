import { NextApiResponseServerIo } from "@/types";
import { Server as NetServer } from "http"
import { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer,{
        path:path,
        addTrailingSlash: false, 
    });
    res.socket.server.io = io
}

export default ioHandler;
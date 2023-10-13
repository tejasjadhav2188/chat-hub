import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    { params }: { params: {serverId:string }}
){
    try {
        const profile = await currentProfile();

        try {
            const profile = await currentProfile();
            const { name , imageUrl } = await req.json();
    
            if(!profile){
                return new NextResponse("Unauthorized", {status: 401});
            }

            if(!params.serverId){
                return new NextResponse("Server Id missing",{status:400});
            }
            const server = await db.server.update({
                where:{
                    id:params.serverId,
                    profileId:{
                        not:profile.id
                    },
                    members:{
                        some:{
                            profileId:profile.id
                        }
                    }
                },
                data: {
                    members:{
                        deleteMany:{
                            profileId:profile.id
                        }
                    }
                }
            }) 
    
            
    
            return NextResponse.json(server);
            
        } catch (error) {
            console.log("[SERVER_ID_PATCH]",error)
            return new NextResponse("Internal Error",{status : 500})
        }
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error",{status:500});
    }
}
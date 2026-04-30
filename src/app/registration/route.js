import prisma from "@/lib/db/prisma";
export async function POST(request) {
    /* todo:
    should upi and student id be @unique?
    */

    try {
        const memberInfo = await request.json();
        
        /* VALIDITY CHECKS ---------------------------------------------------------*/
        switch (true) {
            case (memberInfo.name == null):
            case (memberInfo.email == null):
            case (memberInfo.university == null):
            case (memberInfo.isReturning == null):
            case (memberInfo.skillLevel == null):
            case (memberInfo.faculty == null):
                return Response.json({error: "Required field missing"}, {status: 400});
        }

        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(memberInfo.email)) {
            return Response.json({error: "Invalid email address"}, {status: 400});
        }

        if (0 > memberInfo.skillLevel || 5 < memberInfo.skillLevel ) {
            return Response.json({error: "Skill level not in range"}, {status: 400})
        }

        // Members from UoA have unique required fields
        if (memberInfo.university === "UNIVERSITY_OF_AUCKLAND") {
            switch (true) {
                case (memberInfo.upi == null):
                case (memberInfo.studentId == null):
                case (memberInfo.programme == null):
                case (memberInfo.yearLevel == null):
                case (memberInfo.faculty.length === 0):
                    return Response.json({error: "Required field missing (UoA)"}, {status: 400});
            }
            if (!/^[a-z]{3,4}\d{3}$/.test(memberInfo.upi)) {
                return Response.json({error: "Invalid UPI"}, {status: 400});
            }
            else if (!/^\d{7,10}$/.test(memberInfo.studentId)) {
                return Response.json({error: "Invalid Student ID"}, {status: 400});
            }
        }

        /*  possible other way to check if db entry exists
        const duplicateEmailCheck = await prisma.member.findUnique({
            where: {email = memberInfo.email }
        })
        if (duplicateEmailCheck != null) {
            return Response.json({error: "Duplicate Email"}, {status: 408})
        } */

        // Got here, so can try insert data
        const newMember = await prisma.member.create({
            data: {
                name: memberInfo.name,
                email: memberInfo.email,
                university: memberInfo.university,
                isReturning: memberInfo.isReturning,
                skillLevel: memberInfo.skillLevel,
                upi: memberInfo.upi,
                studentId: memberInfo.studentId,
                faculty: memberInfo.faculty,
                programme: memberInfo.programme,
                yearLevel: memberInfo.yearLevel,
                excerpt: memberInfo.excerpt,
                pitch: memberInfo.pitch,
                potentialInvolvement: memberInfo.potentialInvolvement,
                discordUser: memberInfo.discordUser,
                createdAt: new Date(), // idk if this is needed
                updatedAt: new Date() // same here
            }
        });

        return Response.json(newMember, {status: 200});

    } catch (error) {
        if (error.code === "P2002") {
            // might need to change based on strict privacy requirements
            return Response.json({error: "Duplicate Record"}, {status: 408});
        }
        return Response.json({error: "Bad Request"}, {status: 400});
    }
}
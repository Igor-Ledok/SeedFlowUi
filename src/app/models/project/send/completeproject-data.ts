import { detailsdescription } from "./datailsDescription.interface";
import { ProjectData } from "./project-data.interface";
import { Reward } from "./reward.interface";
import { TeamMember } from "./team-member.interface";

export interface CompleteProjectData {
    Project: ProjectData;
    TeamMembers: TeamMember[];
    Rewards: Reward[];
    ProjectPhoto: string[];
    Descriptions: detailsdescription[];
}

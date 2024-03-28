// import { GuildMember, Message, Role } from 'discord.js';
// import { MemberNotFound } from '../errors/MembersNotFound';
// import { RoleNotFound } from '../errors/RoleNotFound';

export const test = '';

// export async function getRoleByName(message: Message, name: string): Promise<Role> {
//   const manager = await getRoleManager(message);
//   const role = manager?.cache.find(role => role.name == name);
//   if (role) {
//     return role;
//   }
//   throw new RoleNotFound(`Role with name: ${name} not found`);
// }

// export async function getRoleById(message: Message, id: string): Promise<Role> {
//   const manager = await getRoleManager(message);
//   const role = manager?.cache.get(id);
//   if (role) {
//     return role;
//   }
//   throw new RoleNotFound(`Role with ID: ${id} not found`);
// }

// export function getMentionedMembers(message: Message): GuildMember[] {
//   const members = message.mentions.members?.map(x => x);
//   if (members) {
//     return members;
//   }
//   throw new MemberNotFound(`Members not found in message: ${message.id}`);
// }

// function getRoleManager(message: Message) {
//   return message.guild?.roles.fetch();
// }

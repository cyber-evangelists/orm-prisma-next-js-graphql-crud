import bcrypt from 'bcrypt';
import { Context } from '@/pages/api/graphql';

const SALT_ROUNDS = 10;

export const resolvers = {
  Query: {
    employee: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.employee.findUnique({
        where: { id: args.id },
      });
    },
    employees: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.employee.findMany();
    },
  },
  Mutation: {
    addEmployee: async (_parent: any, args: any, context: Context) => {
      const hashedPassword = await bcrypt.hash(args.password, SALT_ROUNDS);
      return await context.prisma.employee.create({
        data: {
          name: args.name,
          email: args.email,
          phone: args.phone,
          password: hashedPassword,
        },
      });
    },
    updateEmployee: (_parent: any, args: any, context: Context) => {
      return context.prisma.employee.update({
        where: { id: args.id },
        data: {
          name: args.name,
          email: args.email,
          phone: args.phone,
          password: args.password,
        },
      });
    },
    deleteEmployee: (_parent: any, args: any, context: Context) => {
      return context.prisma.employee.delete({
        where: { id: args.id },
      });
    },
  },
};

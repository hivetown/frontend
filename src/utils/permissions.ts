import { Permission, User } from '@/types';

export const permissionsFromNumber = (permissions: number) => {
    const permissionList: Permission[] = [];

    for (const permission in Permission) {
        if (isNaN(Number(permission))) continue;

        const permissionNumber = Number(permission);
        const hasPermission =
            (permissions & permissionNumber) === permissionNumber;
        if (hasPermission) permissionList.push(permissionNumber);
    }

    return permissionList.map((permission) => Permission[permission]);
};

export const hasPermission = (user: User, permissions: number) => {
    const userPermissions = user.role?.permissions || 0;
    return (userPermissions & permissions) === permissions;
};

interface Avatar {
  cdnUrl: string; // 用户头像在 CDN 上的地址
  filePath: string; // 用户头像在对象存储上的路径
  fileSize: number; // 文件大小
}
interface UserProfile {
  cuid?: string; // 用户识别 ID，可选
  avatar?: Avatar; // 用户形象，可选
  name: string; // 用户名，必选
  gender: string; // 用户性别，必选
  age: number; // 用户年龄，必选
}
interface UserModel {
  createUser(profile: UserProfile): string; // 创建用户
  getUser?(cuid: string): UserProfile; // 根据 cuid 获取用户
  listFollowers?(cuid: string): UserProfile[]; // 获取所有关注者
  followByCuid?(cuid: string, who: string): string; // 关注某人
}

class UserModelImpl implements UserModel {
    createUser(profile: UserProfile): string {
      return 'done'
    }
}

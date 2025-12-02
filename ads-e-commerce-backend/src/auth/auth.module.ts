import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/client/user.module';
import { User } from 'src/client/entities/user.entity';
//1 
@Module({
  imports: [
    
    UserModule, 
    PassportModule, 
    JwtModule.register({  
      secret: 'tacx32566tghyffg8', // depois colocar no .env
      signOptions: { expiresIn: '1h' },
    }), TypeOrmModule.forFeature([User]) 
  ],
  
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],  
  exports: [AuthService],
})
export class AuthModule {}
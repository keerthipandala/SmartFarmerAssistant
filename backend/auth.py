from backend.schemas import UserCreate, LoginRequest
from backend.models import User
from backend.security import hash_password, verify_password
from backend.jwt_handler import create_access_token


def create_user(data: UserCreate, db):

    hashed_password = hash_password(
        data.password
    )

    new_user = User(
        name=data.name,
        email=data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(data: LoginRequest, db):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if user is None:
        return None

    if not verify_password(
        data.password,
        user.password
    ):
        return None

    token = create_access_token(
        user.id
    )
    print("NEW AUTH FILE EXECUTED")
    return {
        "user": user,
        "token": token
    }
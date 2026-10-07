from backend.schemas import UserCreate, LoginRequest
from backend.models import User
from backend.security import hash_password, verify_password


def create_user(data: UserCreate, db):

    new_user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password)
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

    return user
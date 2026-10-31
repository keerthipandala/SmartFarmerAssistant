
from backend.schemas import UserCreate, LoginRequest
from backend.models import User
from backend.security import hash_password, verify_password
from backend.jwt_handler import create_access_token


def create_user(data: UserCreate, db):
    # Hash the password before saving it
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
    # Find the user by email
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    # Check whether the user exists
    if user is None:
        return None

    # Verify the entered password
    if not verify_password(data.password, user.password):
        return None

    # Generate a JWT access token
    token = create_access_token(user.id)

    # Return the user and token in the format main.py expects
    return {
        "user": user,
        "token": token
    }

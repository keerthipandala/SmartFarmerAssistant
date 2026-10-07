from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "smartfarmersecretkey"
ALGORITHM = "HS256"

def create_access_token(user_id):

    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=24)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token
from setup import setup
from web_handler import host

if __name__ == '__main__':
    print(" ========== Started backend ========== ")
    setup(reset=True)
    host()

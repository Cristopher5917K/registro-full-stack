"""empty message

Revision ID: 63be234c62d4
Revises: 0763d677d453
Create Date: 2025-05-28 03:11:50.137205

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63be234c62d4'
down_revision = '0763d677d453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('salt', sa.String(length=120), nullable=False))
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_column('salt')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
